using NLog;
using NLog.Web;
using Microsoft.EntityFrameworkCore;
using StudentCompass.Data.Context;

namespace StudentCompass.Server.Helpers;

public class DatabaseConfigurator
{
    private static readonly Logger Logger = LogManager.Setup().LoadConfigurationFromAppSettings().GetCurrentClassLogger();

    public static AppDbContext ConfigureDatabase(IServiceCollection services, IConfiguration configuration)
    {
        try
        {
            //Log.Debug("Configuring database");
            var connectionString = configuration.GetConnectionString("ConnectionString")!;
            var context = AppDbContext.CreateAppDbContext(connectionString);

            try
            {
                Logger.Debug("Ensuring database schema is up to date...");
                context.EnsureMigrated();
                Logger.Info("Database up to date");
            }
            catch (Exception ex)
            {
                Logger.Error(ex, "Failed to migrate database");
                throw;
            }

            Logger.Info(context.Database.CanConnect() ? "Ping to the database: DB ON" : "Ping to the database: FAILED");

            services.AddDbContext<AppDbContext>(item => item.UseSqlServer(connectionString));

            Logger.Info("Database configured");
            return context;
        }
        catch (Exception ex)
        {
            Logger.Error(ex, "Failed to connect to the database");
            throw;
        }
    }
}