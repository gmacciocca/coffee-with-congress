from django.http import HttpResponse

# Create your views here.
def index(request):
    return HttpResponse("Hello, cofee with congress. You are at index.")
