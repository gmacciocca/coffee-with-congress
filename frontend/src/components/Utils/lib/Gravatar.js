
export default class Gravatar {
    constructor({ networkTransport }) {
        this._networkTransport = networkTransport;
    }

    getImageUrl(emailHash) {
        return `http://gravatar.com/avatar/${emailHash}`;
    }

    fetchUserInfo(emailHash) {
        const path = `https://en.gravatar.com/${emailHash}.json`;
        return this._networkTransport.get(path)
            .then(userJson => {
                const photoUrl =
                    userJson &&
                    userJson.entry &&
                    Array.isArray(userJson.entry.photos) &&
                    userJson.entry.photos[0] &&
                    userJson.entry.photos[0].type === "thumbnail" &&
                    userJson.entry.photos[0].value;

                const bio =
                    userJson &&
                    userJson.entry &&
                    userJson.entry.aboutMe;

                const name =
                    userJson &&
                    userJson.entry &&
                    userJson.entry.name &&
                    userJson.entry.name.formatted;

                return { name, bio, photoUrl };
            }, () => {
                return {};
            });
    }
}
