from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .services.classifier import extract_parts
from .services.sensitive_main import main
import asyncio

@api_view(['POST'])
def analyze_comment(request):
    comment = request.data.get("comment", "")
    # Dummy logic for now
    result = extract_parts(comment)
    content=result['text']
    # Call the unified text classifier
    sensitive_result = asyncio.run(main(content)) 

    return Response(sensitive_result)
