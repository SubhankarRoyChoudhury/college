from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth import get_user_model
from django.utils.translation import gettext_lazy as _
from .models import CollegeUser, UploadedFile

User = get_user_model()

# Unregister the User model if it is already registered
admin.site.unregister(User)

# @admin.register(User)
class CustomUserAdmin(UserAdmin):
    # Define list display for the user model
    list_display = ('username', 'email', 'first_name', 'last_name', 'is_staff', 'is_superuser', 'is_active')

    # Define search fields and ordering
    search_fields = ('username', 'email', 'first_name', 'last_name')
    ordering = ('username',)

# Customizing the admin view for the CollegeUser model
class CollegeUserAdmin(admin.ModelAdmin):
    list_display = (
        'id', 'first_name', 'last_name','fatherOrHusband', 'username', 'address', 'attachment_id', 'department', 'gender', 'country', 'state', 'city', 'pin', 'email', 'college',
        'is_active', 'is_staff', 'is_superuser', 'is_admin', 'is_assistant', 'is_owner', 'is_manager', 'delist', 'delisted_by', 'delisted_on', 'registrationDate'
    )
    search_fields = ('first_name', 'last_name', 'username', 'email', 'college__college_name')
    list_filter = ('is_active', 'is_superuser', 'is_admin', 'college')


class UploadedFileAdmin(admin.ModelAdmin):
    list_display = [
        'id',
        'file',
        'uploaded_at',

        
    ]

admin.site.register(UploadedFile, UploadedFileAdmin)


# Registering models with custom admin views
admin.site.register(User, CustomUserAdmin)
admin.site.register(CollegeUser, CollegeUserAdmin)
