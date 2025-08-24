using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;
using Domain.Data;
using Domain.Dto;
using Domain.Models;
using Domain.Models.BaseInfo;
using Domain.Models.Advertising;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authentication;
using Repository.IRepository.BaseInfo;
using Repository.Repository.BaseInfo;
using Service.IServices.BaseInfo;
using Service.Services.BaseInfo;
using Repository.IRepository;
using Repository.Repository;
using Service.IServices;
using Service.Services;
using Repository.IRepository.Advertising;
using Repository.Repository.Advertising;
using Service.IServices.Advertising;
using Service.Services.Advertising;
using Service.IServices.Footer;
using Service.Services.Footer;

namespace AlborzShopCenter
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors();
            services.AddControllersWithViews().AddJsonOptions(options =>
            {
                // set this option to TRUE to indent the JSON output
                options.JsonSerializerOptions.WriteIndented = true;
                // set this option to NULL to use PascalCase instead of
                // CamelCase (default)
                // options.JsonSerializerOptions.PropertyNamingPolicy = null;
            });

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });

            services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection"), b => b.MigrationsAssembly("Domain")));//AlborzShopCenter-Domain

            // Add ASP.NET Core Identity support
            services.AddDefaultIdentity<ApplicationUser>(options =>
            {
                options.SignIn.RequireConfirmedAccount = true;
                options.Password.RequireDigit = true;
                options.Password.RequireLowercase = true;
                options.Password.RequireUppercase = true;
                options.Password.RequireNonAlphanumeric = true;
                options.Password.RequiredLength = 8;
            }).AddRoles<IdentityRole>().AddEntityFrameworkStores<ApplicationDbContext>();
            services.AddIdentityServer().AddApiAuthorization<ApplicationUser, ApplicationDbContext>();
            services.AddAuthentication().AddIdentityServerJwt();

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = IdentityConstants.ApplicationScheme;
                //options.DefaultChallengeScheme = IdentityConstants.ApplicationScheme;
                options.DefaultSignInScheme = IdentityConstants.ExternalScheme;
            });

            var emailConfig = Configuration.GetSection("EmailConfiguration").Get<EmailConfigurationDto>();
            services.AddSingleton(emailConfig);

            services.AddScoped(typeof(ICountryRepository<>), typeof(CountryRepository<>));
            services.AddScoped<ICountryService<CountryModel>, CountryService>();
            services.AddScoped(typeof(ICityRepository<>), typeof(CityRepository<>));
            services.AddScoped<ICityService<CityModel>, CityService>();
            services.AddScoped(typeof(ICategoryRepository<>), typeof(CategoryRepository<>));
            services.AddScoped<ICategoryService<CategoryModel>, CategoryService>();
            services.AddScoped(typeof(IBrandRepository<>), typeof(BrandRepository<>));
            services.AddScoped<IBrandService<BrandModel>, BrandService>();
            services.AddScoped(typeof(IShopRepository<>), typeof(ShopRepository<>));
            services.AddScoped<IShopService<ShopModel>, ShopService>();
            services.AddScoped(typeof(IProductRepository<>), typeof(ProductRepository<>));
            services.AddScoped<IProductService<ProductModel>, ProductService>();
            services.AddScoped(typeof(IApplicationUserRepository<>), typeof(ApplicationUserRepository<>));
            services.AddScoped<IApplicationUserService<ApplicationUser>, ApplicationUserService>();
            services.AddScoped(typeof(IOrderRepository<>), typeof(OrderRepository<>));
            services.AddScoped<IOrderService<OrderModel>, OrderService>();
            services.AddScoped(typeof(IOrderDetailsRepository<>), typeof(OrderDetailsRepository<>));
            services.AddScoped<IOrderDetailsService<OrderDetailsModel>, OrderDetailsService>();
            services.AddScoped(typeof(ITimeSendingRepository<>), typeof(TimeSendingRepository<>));
            services.AddScoped<ITimeSendingService<TimeSendingModel>, TimeSendingService>();
            services.AddScoped(typeof(IGroupRepository<>), typeof(GroupRepository<>));
            services.AddScoped<IGroupService<GroupModel>, GroupService>();
            services.AddScoped(typeof(ISettingsRepository<>), typeof(SettingsRepository<>));
            services.AddScoped<ISettingsService<SettingsModel>, SettingsService>();
            services.AddScoped(typeof(IAdvertisingRepository<>), typeof(AdvertisingRepository<>));
            services.AddScoped<IAdvertisingService<AdvertisingModel>, AdvertisingService>();
            services.AddScoped(typeof(IAdverCategoriesAndFeaturesRepository<>), typeof(AdverCategoriesAndFeaturesRepository<>));
            services.AddScoped<IAdverCategoriesAndFeaturesService<AdverCategoriesAndFeaturesModel>, AdverCategoriesAndFeaturesService>();
            services.AddScoped(typeof(IAdverCategoriesAndFeaturesDetailsRepository<>), typeof(AdverCategoriesAndFeaturesDetailsRepository<>));
            services.AddScoped<IAdverCategoriesAndFeaturesDetailsService<AdverCategoriesAndFeaturesDetailsModel>, AdverCategoriesAndFeaturesDetailsService>();
            services.AddScoped<ITermAndConditionsService, TermAndConditionsService>();
            services.AddScoped<IFAQService, FAQService>();
            services.AddScoped<IHelpService, HelpService>();
            services.AddScoped(typeof(IUserAccessRepository<>), typeof(UserAccessRepository<>));
            services.AddScoped<IUserAccessService<UserAccessModel>, UserAccessService>();
            services.AddScoped<IEmailSenderService, EmailSenderService>();
            services.AddScoped<IReportsService, ReportsService>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseRouting();

            app.UseAuthentication();
            app.UseIdentityServer();
            app.UseAuthorization();

            // Shows UseCors with CorsPolicyBuilder.
            app.UseCors(builder =>
            {
                builder.AllowAnyOrigin()
                       .AllowAnyMethod()
                       .AllowAnyHeader();
            });

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");

                endpoints.MapRazorPages();
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }
    }
}
