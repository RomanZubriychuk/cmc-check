from aiohttp import ClientSession
from async_lru import alru_cache

class HttpClient:
    def __init__(self, base_url: str, api_key: str):
        self._session = ClientSession(
            headers={
                "Content-Type": "application/json",
                'X-CMC_PRO_API_KEY': api_key,
            },
            base_url=base_url
        )


class CMCHttpClient(HttpClient):
    @alru_cache(maxsize=128) # This is a decorator that caches the result of the function, bad idea for dynamic data
    async def get_latest_listings(self):
        async with self._session.get("/v1/cryptocurrency/listings/latest") as response:
            result = await response.json()
            return result["data"]

    @alru_cache(maxsize=128) # This is a decorator that caches the result of the function, bad idea for dynamic data
    async def get_currency(self, currency_id: int):
        async with self._session.get("/v2/cryptocurrency/quotes/latest", params={"id": currency_id}) as response:
            result = await response.json()
            return result["data"][str(currency_id)]
