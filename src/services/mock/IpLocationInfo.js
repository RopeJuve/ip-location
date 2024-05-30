class IpInfo {
    constructor(data) {
        this.ip = data.ip;
        this.location = new Location(data.location);
        this.as = new As(data.as);
        this.isp = data.isp;
    }
}

class Location {
    constructor(data) {
        this.country = data.country;
        this.region = data.region;
        this.city = data.city;
        this.lat = data.lat;
        this.lng = data.lng;
        this.postalCode = data.postalCode;
        this.timezone = data.timezone;
        this.geonameId = data.geonameId;
    }
}

class As {
    constructor(data) {
        this.asn = data.asn;
        this.name = data.name;
        this.route = data.route;
        this.domain = data.domain;
        this.type = data.type;
    }
}

export default IpInfo;