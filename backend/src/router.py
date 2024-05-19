from fastapi import APIRouter

from src.init import cmc_client

router = APIRouter(
    prefix="/cryptocurrencies",
    tags=["cryptocurrencies"]
)


@router.get("")
async def get_cryptocurrencies():
    return await cmc_client.get_latest_listings()

@router.get("/{currency_id}")
async def get_currency(currency_id: int):
    return await cmc_client.get_currency(currency_id)