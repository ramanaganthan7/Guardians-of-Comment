from rest_framework.decorators import api_view
from rest_framework.response import Response
from .services.harmful_main import main
from .services.classifier import extract_parts
from .services.phishingmain import checker
import asyncio

@api_view(['POST'])
def harmful_comment_view(request):
    if request.method == 'GET':
        return Response({"message": "hello world"})
    
    # POST method logic
    comment = request.data.get("comment", "")
    comment_classify = extract_parts(comment)
    content = comment_classify['text']
    urls = comment_classify['link']
    
    if content:
        res = asyncio.run(main(content))
        if res["result"]:
            return Response({"allowed": False})
        elif urls:
            result = asyncio.run(checker(urls))
            if result:
                return Response({"allowed": False})
            else:
                return Response({"allowed": True})
        else:
            return Response({"allowed": True})
    elif urls:
        result = asyncio.run(checker(urls))
        if result:
            return Response({"allowed": False})
        else:
            return Response({"allowed": True})

    return Response({"allowed": True})  # default fallback
@api_view(['GET'])
def test_view(request):
    return Response({"message": "hello world"})
