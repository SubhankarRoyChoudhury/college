from django.contrib import admin
from .models import College


# Register your models here.
# Customizing the admin view for the College model
class CollegeAdmin(admin.ModelAdmin):
    list_display = (
        'id', 'college_id', 'name', 'admin_name', 'address', 'country', 'state', 'city', 'pin', 'email', 'is_admin',
        'is_approved', 'registrationDate'
    )
    search_fields = ('name', 'college_id', 'admin_name', 'email')
    list_filter = ('is_approved', 'registrationDate')

admin.site.register(College, CollegeAdmin)