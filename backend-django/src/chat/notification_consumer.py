import json

from channels.generic.websocket import AsyncWebsocketConsumer
from django.contrib.auth import get_user_model

User = get_user_model()


class NotificationConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.user = self.scope["user"]

        if self.user.is_anonymous:
            # Rejeter la connexion si l'utilisateur n'est pas authentifié
            await self.close(code=4001)
            return

        # Créer un groupe de notification unique pour cet utilisateur
        self.notification_group_name = f"notifications_{self.user.id}"

        # Rejoindre le groupe de notification
        await self.channel_layer.group_add(
            self.notification_group_name, self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        # Quitter le groupe de notification
        await self.channel_layer.group_discard(
            self.notification_group_name, self.channel_name
        )

    async def new_message_notification(self, event):
        """Envoyer une notification de nouveau message au client"""
        # Envoyer l'événement au client
        await self.send(
            text_data=json.dumps(
                {
                    "type": "new_message",
                    "conversation_id": event["conversation_id"],
                    "message_id": event["message_id"],
                    "sender_id": event["sender_id"],
                    "content": event["content"],
                    "timestamp": event["timestamp"],
                }
            )
        )
