import prisma from '../../lib/prisma';

// Restrieve the last 48 values of exchange where coin is CUP or MLC
// Find out how cache this for about 5 minutes for every request
const getCoinData = async () => {

    // Obtén los últimos 48 valores de cambio donde coin es "CUP"
    const cupHistory = await prisma.exchange.findMany({
        where: {
            coinId: 1,
        },
        orderBy: {
            updated_at: 'desc',
        },
        take: 48,
    });

    // Obtén los últimos 48 valores de cambio donde coin es "MLC"
    const mlcHistory = await prisma.exchange.findMany({
        where: {
            coinId: 2,
        },
        orderBy: {
            updated_at: 'desc',
        },
        take: 48,
    });

    return { cupHistory, mlcHistory };
}

// Save the coin history into DB
const saveCoinData = async (cup, mlc) => {
    
    const rspCup = await prisma.exchange.create({
        data: {
            coinId: 1,
            value: cup,
        },
    });
    
    const rspMlc = await prisma.exchange.create({
        data: {
            coinId: 2,
            value: mlc,
        },
    });

    return { cup, mlc };
}

export { getCoinData, saveCoinData };