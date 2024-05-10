from django.http import JsonResponse, HttpResponseBadRequest
from django.core.exceptions import ValidationError
from django.shortcuts import get_object_or_404
from accounts.models import User
from .models import Message

def get_messages(request, username):
    user = get_object_or_404(User, username=username)
    sent_messages = Message.objects.filter(sender=user).values('receiver__username', 'message', 'timestamp')
    received_messages = Message.objects.filter(receiver=user).values('sender__username', 'message', 'timestamp')
    data = {
        'sent_messages': list(sent_messages),
        'received_messages': list(received_messages),
    }
    return JsonResponse(data)

def send_message(request, username):
    sender = get_object_or_404(User, username=username)
    receiver_username = request.POST.get('receiver')
    receiver = get_object_or_404(User, username=receiver_username)
    message_text = request.POST.get('message')

    message = Message(sender=sender, receiver=receiver, message=message_text)

    try:
        message.full_clean()
        message.save()
        return JsonResponse({'status': 'success'})
    except ValidationError as e:
        return HttpResponseBadRequest('Invalid data: {}'.format(e))