from rest_framework import serializers

from users.models import User


class UserSerializer(serializers.ModelSerializer):
    avatar_url = serializers.SerializerMethodField()
    password = serializers.CharField(
        write_only=True, required=True, style={"input_type": "password"}
    )

    class Meta:
        model = User
        fields = (
            "id",
            "email",
            "first_name",
            "last_name",
            "password",
            "is_active",
            "avatar",
            "avatar_url",
            "status",
        )
        extra_kwargs = {
            "password": {"write_only": True},
            "is_active": {"read_only": True},
            "avatar": {"write_only": True},
        }

    def get_avatar_url(self, obj):
        request = self.context.get("request")
        if not request:
            # Si request est None, retourner juste l'URL relative ou None
            return obj.avatar.url if obj.avatar else None

        # Sinon, retourner l'URL absolue
        if obj.avatar:
            return request.build_absolute_uri(obj.avatar.url)
        return None

    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data["email"],
            password=validated_data["password"],
            first_name=validated_data.get("first_name", ""),
            last_name=validated_data.get("last_name", ""),
        )
        return user

    def update(self, instance, validated_data):
        if "password" in validated_data:
            password = validated_data.pop("password")
            instance.set_password(password)
        return super().update(instance, validated_data)
