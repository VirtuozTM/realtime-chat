from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.forms import UserChangeForm, UserCreationForm

from .models import User


class CustomUserCreationForm(UserCreationForm):
    class Meta:
        model = User
        fields = (
            "email",
            "first_name",
            "last_name",
            "is_active",
            "is_staff",
            "avatar",
            "status",
        )


class CustomUserChangeForm(UserChangeForm):
    class Meta:
        model = User
        fields = (
            "email",
            "first_name",
            "last_name",
            "is_active",
            "is_staff",
            "avatar",
            "status",
        )


class CustomUserAdmin(UserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = User

    # Champs à afficher dans la liste
    list_display = (
        "email",
        "first_name",
        "last_name",
        "avatar",
        "status",
        "created_at",
        "is_active",
        "is_staff",
    )

    list_filter = (
        "is_staff",
        "is_superuser",
    )
    fieldsets = (
        (None, {"fields": ("email", "password")}),
        (
            "Informations personnelles",
            {
                "fields": (
                    "first_name",
                    "last_name",
                    "avatar",
                    "status",
                )
            },
        ),
        (
            "Permissions",
            {
                "fields": (
                    "is_staff",
                    "is_active",
                    "is_superuser",
                    "groups",
                    "user_permissions",
                )
            },
        ),
        ("Dates importantes", {"fields": ("last_login",)}),
    )

    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": (
                    "email",
                    "first_name",
                    "last_name",
                    "avatar",
                    "status",
                    "is_active",
                    "is_staff",
                    "password1",
                    "password2",
                ),
            },
        ),
    )
    search_fields = (
        "email",
        "first_name",
        "last_name",
        "avatar",
        "status",
        "created_at",
        "is_active",
        "is_staff",
    )
    ordering = ("email",)


# Enregistrement des modèles dans l'administration
admin.site.register(User, CustomUserAdmin)
