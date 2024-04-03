from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

# Create your views here.
class SignIn(APIView):
    def post(self, request):
        auth = {'id': 1, 'name': 'alex', 'email': 'ferrich'}
        return Response(auth, status=status.HTTP_200_OK)