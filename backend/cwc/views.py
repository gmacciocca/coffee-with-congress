from django.http import JsonResponse
from cwc import models
from django.utils import timezone
from apiclient.discovery import build
from cwc import settings
from cwc.clients import CivicApi

def index(request):
    return JsonResponse("Hello, cofee with congress. You are at index.")

def get_issues(request):
    issues = [issue.for_export() for issue in models.Issue.objects.filter(until__gte=timezone.now())]
    return JsonResponse(issues, safe=False)

def get_contacts(request):
    api = CivicApi()
    api.build()
    address = request.GET['address']
    contacts = api.contactsForAddress(address)
    return JsonResponse(contacts, safe=False)
