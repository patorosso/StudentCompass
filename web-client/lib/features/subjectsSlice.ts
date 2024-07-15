import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { RootState } from "../store";
import { toast } from "react-toastify";

// Slice state type
interface SubjectsState {
  subjectsList: Subject[];
  subjectsToUpdate: Subject[];
  subjectsBackup: Subject[];
  isEditing: boolean;
  detailModalOpen: boolean;
  selectedSubject: Subject | undefined;
  error: string | undefined;
  status: "idle" | "loading" | "succeeded" | "failed";
}

// Fetch subjects params
interface FetchSubjectsArgs {
  student: string | null;
  career: string | null;
}

// Add current subjects params
type AddCurrentSubjectsType = {
  student: string;
  subjects: Subject[];
};

// Add current subjects payload
type AddCurrentSubjectsPayload = {
  code: number;
  courseId: number;
};

// Initial state
const initialState: SubjectsState = {
  subjectsList: [],
  subjectsToUpdate: [],
  subjectsBackup: [],
  isEditing: false,
  detailModalOpen: false,
  selectedSubject: undefined,
  error: undefined,
  status: "idle",
};

export const subjectsSlice = createSlice({
  name: "subjects",
  initialState,
  reducers: {
    addSubjectToUpdate: (state, action) => {
      if (state.selectedSubject === undefined) return;

      // se agrega o actualiza la materia en la lista de materias a actualizar
      let inUpdateList = state.subjectsToUpdate.find((subject) => {
        return subject.code === state.selectedSubject!.code;
      });
      if (inUpdateList === undefined)
        state.subjectsToUpdate = [
          ...state.subjectsToUpdate,
          state.selectedSubject,
        ];
      else {
        inUpdateList.finalGrade = state.selectedSubject!.finalGrade;
        inUpdateList.status = state.selectedSubject!.status;
      }

      // si no estaba, se agrega la materia a la lista de materias de backup
      let inBackupList = state.subjectsBackup.some((subject) => {
        return subject.code === action.payload.previousSubject.code;
      });
      if (!inBackupList)
        state.subjectsBackup = [
          ...state.subjectsBackup,
          action.payload.previousSubject,
        ];

      // se actualiza la lista de subjects
      state.subjectsList = state.subjectsList.map((subject) =>
        subject.code === action.payload.previousSubject.code
          ? state.selectedSubject! // updated subject
          : subject
      ); // update subjects list

      state.selectedSubject = undefined; // reset edicion

      action.payload.subjectsToMakeAvailable.map((subject: Subject) => {
        let inBackupList = state.subjectsBackup.some((subjectList) => {
          return subject.code === subjectList.code;
        });
        if (!inBackupList)
          state.subjectsBackup = [...state.subjectsBackup, subject];
      });

      action.payload.subjectsToMakeAvailable.map((subject: Subject) => {
        state.subjectsList = state.subjectsList.map((subjectList) =>
          subjectList.code === subject.code
            ? { ...subjectList, status: "Disponible" }
            : subjectList
        );
      });

      action.payload.subjectsToMakeUnavailable.map((subject: Subject) => {
        let inBackupList = state.subjectsBackup.some((subjectList) => {
          return subjectList.code === subject.code;
        });
        if (!inBackupList)
          state.subjectsBackup = [...state.subjectsBackup, subject];
      });

      action.payload.subjectsToMakeUnavailable.map((subject: Subject) => {
        state.subjectsList = state.subjectsList.map((subjectList) =>
          subject.code === subjectList.code
            ? { ...subjectList, status: "No disponible" }
            : subjectList
        );
      });
    },
    updateGradeSelectedSubject: (state, action) => {
      if (state.selectedSubject) {
        state.selectedSubject = {
          ...state.selectedSubject,
          finalGrade: action.payload === "-" ? null : action.payload,
        };
      }
    },
    updateStatusSelectedSubject: (state, action) => {
      if (state.selectedSubject) {
        state.selectedSubject = {
          ...state.selectedSubject,
          status: action.payload,
        };
      }
    },
    setSelectedSubject: (state, action) => {
      state.selectedSubject = action.payload;
    },
    setIsEditing: (state, action) => {
      state.isEditing = action.payload;
    },
    setEditingFalse: (state) => {
      state.isEditing = false;
      state.selectedSubject = undefined;
      state.subjectsToUpdate = [];

      const backupLookup = new Map(
        state.subjectsBackup.map((sub) => [sub.code, sub])
      );
      state.subjectsList = state.subjectsList.map((subject) => {
        return backupLookup.get(subject.code) || subject;
      });
    },
    setDetailedModal: (state, action) => {
      state.detailModalOpen = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchSubjects.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchSubjects.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.subjectsList = action.payload;
      })
      .addCase(fetchSubjects.rejected, (state, action) => {
        state.status = "failed";
        toast.error("Error inesperado." + action.error.message);
        state.error = action.error.message;
      })
      .addCase(addCurrentSubjects.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(addCurrentSubjects.fulfilled, (state, action) => {
        state.status = "succeeded";
        toast.success("Materias agregadas correctamente.");
        const payload = action.payload;

        state.subjectsList = state.subjectsList.map((subject) => {
          const payloadSubject = payload.find(
            (p: AddCurrentSubjectsPayload) => p.code === subject.code
          );
          return payloadSubject
            ? {
                ...subject,
                courseId: payloadSubject.courseId,
                status: "Cursando",
              }
            : subject;
        });
      })
      .addCase(addCurrentSubjects.rejected, (state, action) => {
        state.status = "failed";
        toast.error("Error inesperado." + action.error.message);
        state.error = action.error.message;
      })
      .addCase(updateSubjects.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(updateSubjects.fulfilled, (state, action) => {
        state.status = "succeeded";
        toast.success("Materias actualizadas correctamente.");
        state.subjectsList = action.payload;
        state.isEditing = false;
        state.subjectsBackup = [];
        state.subjectsToUpdate = [];
        state.selectedSubject = undefined;
      })
      .addCase(updateSubjects.rejected, (state, action) => {
        state.status = "failed";
        var error = action.payload as any; // change, watch out when server is not running.
        toast.error(error.message);
        state.error = action.error.message;

        const backupLookup = new Map(
          state.subjectsBackup.map((sub) => [sub.code, sub])
        );

        state.subjectsList = state.subjectsList.map((subject) => {
          return backupLookup.get(subject.code) || subject;
        });

        state.isEditing = false;
        state.subjectsBackup = [];
        state.subjectsToUpdate = [];
        state.selectedSubject = undefined;
      });
  },
});

// Async thunk
export const fetchSubjects = createAsyncThunk(
  "subjects/fetchSubjects",
  async ({ student, career }: FetchSubjectsArgs, { rejectWithValue }) => {
    const response = await fetch(
      `https://localhost:7006/api/dashboard/progress?studentId=${student}&careerPlanId=${career}`
    );
    if (response.status === 500) {
      return rejectWithValue({
        message: "Error inesperado, no fue posible conectarse con el servidor.",
      });
    }
    return await response.json();
  }
);

// Async thunk
export const addCurrentSubjects = createAsyncThunk(
  "subjects/addCurrentSubjects",
  async (
    { subjects, student }: AddCurrentSubjectsType,
    { rejectWithValue }
  ) => {
    const response = await fetch(
      `https://localhost:7006/api/dashboard/progress/createInProgressCourse?studentId=${student}`,
      {
        method: "POST",
        body: JSON.stringify(subjects),
        headers: { "Content-Type": "application/json" },
      }
    );
    if (response.status === 500) {
      return rejectWithValue({
        message: "Error inesperado, no fue posible conectarse con el servidor.",
      });
    }
    return await response.json();
  }
);

// Async thunk
export const updateSubjects = createAsyncThunk(
  "subjects/updateSubjects",
  async (subjects: Subject[], { rejectWithValue }) => {
    const subjectsToUpdate: UpdateSubjectDto[] = subjects.map((subject) => ({
      code: subject.code,
      finalGrade: subject.finalGrade,
      courseId: subject.courseId,
      status: subject.status,
      careerPlanId: subject.careerPlanId,
    }));

    const response = await fetch(
      `https://localhost:7006/api/dashboard/progress/updateSubjects?studentId=1&careerPlanId=1`,
      {
        method: "PUT",
        body: JSON.stringify(subjectsToUpdate),
        headers: { "Content-Type": "application/json" },
      }
    );
    if (response.status === 500) {
      return rejectWithValue({
        message: "Error inesperado, no fue posible conectarse con el servidor.",
      });
    }
    if (!response.ok) {
      return rejectWithValue(await response.json());
    }

    return await response.json();
  }
);
// Export actions
export const {
  addSubjectToUpdate,
  setIsEditing,
  setSelectedSubject,
  setEditingFalse,
  updateGradeSelectedSubject,
  updateStatusSelectedSubject,
  setDetailedModal,
} = subjectsSlice.actions;

// Selectors
export const selectAllSubjects = (state: RootState) =>
  state.subjects.subjectsList;

export const selectAvailableSubjects = createSelector(
  [selectAllSubjects],
  (subjectsList) =>
    subjectsList.filter((subject) => subject.status === "Disponible")
);

export const selectInProgressSubjects = createSelector(
  [selectAllSubjects],
  (subjectsList) =>
    subjectsList.filter((subject) => subject.status === "Cursando")
);

export const selectIsEditing = (state: RootState) => state.subjects.isEditing;
export const selectDetailedModal = (state: RootState) =>
  state.subjects.detailModalOpen;
export const selectAllToUpdatedSubjects = (state: RootState) =>
  state.subjects.subjectsToUpdate;
export const selectSelectedSubject = (state: RootState) =>
  state.subjects.selectedSubject;
export const selectSubjectsToUpdate = (state: RootState) =>
  state.subjects.subjectsToUpdate;

export default subjectsSlice.reducer;
