import httpx
import base64

# Replace with your actual VirusTotal API key
VIRUSTOTAL_API_KEY = "193cc2bad6df15f7b66dffd94d1f2ff72ed4f1ddcba3f78da4538fb1ad80f17e"

async def checker(url):
    print("Checking URL:", url[0])
    url = url[0]
    vt_headers = {
        "x-apikey": VIRUSTOTAL_API_KEY
    }

    async with httpx.AsyncClient() as client:
        # Step 1: Submit the URL
        vt_submit = await client.post(
            "https://www.virustotal.com/api/v3/urls",
            data={"url": url},
            headers=vt_headers
        )

        if vt_submit.status_code != 200:
            print("Submission failed")
            return True  # Assume malicious if submission fails

        # Step 2: Encode the URL
        encoded_url = base64.urlsafe_b64encode(url.encode()).decode().strip("=")

        # Step 3: Get the report
        vt_report = await client.get(
            f"https://www.virustotal.com/api/v3/urls/{encoded_url}",
            headers=vt_headers
        )

        if vt_report.status_code != 200:
            # print("Report fetch failed")
            return True  # Assume malicious if report fails

        data = vt_report.json()
        attributes = data.get("data", {}).get("attributes", {})
        stats = attributes.get("last_analysis_stats", {})
        print("Analysis stats:", stats)

        if not stats:
            return True  # Assume malicious if stats missing

        return stats.get("malicious", 0) > 0
