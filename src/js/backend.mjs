import PocketBase from 'pocketbase';
const db = new PocketBase("http://127.0.0.1:8090");


export async function getOffres() {
    try {
        let data = await db.collection('maison').getFullList({
            sort: '-created',
        });
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en lisant la liste des maisons', error);
        return [];
    }
}

export async function getImageUrl(record, recordImage) {
    return db.files.getURL(record, recordImage);
}

export async function getOffre(id) {
    try {
        const data = await db.collection('maison').getOne(id);
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en lisant la maison', error);
        return null;
    }
}

export async function getOffresParSurface(surfaceMin) {
    try {
        const records = await db.collection('maison').getFullList({
            filter: `surface >= ${surfaceMin}`,
        });
        return records;
    } catch (error) {
        console.log('Erreur lors du filtrage par surface', error);
        return [];
    }
}

export async function addOffre(house) {
    try {
        await db.collection('maison').create(house);
        return {
            success: true,
            message: 'Offre ajoutée avec succès'
        };
    } catch (error) {
        console.log('Une erreur est survenue en ajoutant la maison', error);
        return {
            success: false,
            message: 'Une erreur est survenue en ajoutant la maison'
        };
    }
}

export async function filterByPrix(minPrix, maxPrix) {
    try {
        const data = await db.collection('maison').getFullList({
            filter: `prix >= ${minPrix} && prix <= ${maxPrix}`,
            sort: '-prix',
        });
        return data;
    } catch (error) {
        console.log('Une erreur est survenue lors du filtrage par prix', error);
        return [];
    }
}

export async function setFavori(house) {
    try {
        await db.collection('maison').update(house.id, {
            favori: !house.favori
        });
    } catch (error) {
        console.log('Erreur lors de la mise à jour du favori', error);
    }
}



export async function getAgents() {
    try {
        const agents = await db.collection('Agent').getFullList();
        return agents;
    } catch (error) {
        console.error("Erreur agents:", error);
        return [];
    }
}

export async function getAgent(id) {
    try {
        const agent = await db.collection('Agent').getOne(id, {
            expand: 'relation', 
        });
        return agent;
    } catch (error) {
        console.error("Erreur agent ID:", error);
        return null;
    }
}


export async function allArtists() {
    try {

        const artists = await db.collection("artists").getFullList({
            sort: 'last_name',
        });
        return artists;
    } catch (error) {
        console.error("Erreur lors de la récupération des artistes :", error);
        return []; 
    }
}

export async function getOffresParAgent(agentId) {
    try {
        const offres = await db.collection('maison').getFullList({
            filter: `relation = "${agentId}"`,
        });
        return offres;
    } catch (error) {
        return [];
    }
}