from django.contrib import admin
from .models import College, CollegeUser

# Customizing the admin view for the College model
class CollegeAdmin(admin.ModelAdmin):
    list_display = ('id', 'college_id', 'college_name', 'admin_name', 'address', 'country', 'state', 'city', 'pin', 'email', 'is_approved', 'registrationDate')
    search_fields = ('college_name', 'college_id', 'admin_name', 'email')
    list_filter = ('is_approved', 'registrationDate')

# Customizing the admin view for the CollegeUser model
class CollegeUserAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'username', 'address', 'country', 'state', 'city', 'pin', 'email', 'college', 'is_active', 'is_superuser', 'is_admin', 'is_staff', 'is_owner', 'is_manager', 'registrationDate')
    search_fields = ('name', 'username', 'email', 'college__college_name')
    list_filter = ('is_active', 'is_superuser', 'is_admin', 'college')

# Registering models with custom admin views
admin.site.register(College, CollegeAdmin)
admin.site.register(CollegeUser, CollegeUserAdmin)
