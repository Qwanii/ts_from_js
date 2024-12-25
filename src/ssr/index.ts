import Services, { AppConfig } from "../services";

export type SSRServiceClass = {
    servicese: Services
}


class SSRService {
    services: Services;
    config: AppConfig;
    promises: Array<() => void> ;


    constructor(services: Services, config: AppConfig) {
        this.services = services;
        this.config = config;
        this.promises = []
    }

    add(promise) {
        this.promises.push(promise)
    }
}

export default SSRService;