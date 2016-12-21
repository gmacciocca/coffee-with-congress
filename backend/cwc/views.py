from django.http import JsonResponse
from cwc.models import Issue

def index(request):
    return JsonResponse("Hello, cofee with congress. You are at index.")
