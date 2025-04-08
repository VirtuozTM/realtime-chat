from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path

urlpatterns = (
    [
        # Admin
        path("admin/", admin.site.urls),
        # Applications
        path("api/chat/", include("chat.urls")),
        # Authentication
        path("api/auth/", include("users.urls")),
        path("api-auth/", include("rest_framework.urls")),
    ]
    + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
)
