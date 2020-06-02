const fs = require("fs").promises;

async function unionUfCity() {
    try {
        const ufsBinario = await fs.readFile("./JSONs/Estados.json", "utf-8");
        const ufs = JSON.parse(ufsBinario);

        const citiesBinario = await fs.readFile(
            "./JSONs/Cidades.json",
            "utf-8"
        );
        const cities = JSON.parse(citiesBinario);

        ufs.forEach((uf) => {
            const newCities = cities.filter((city) => {
                return city.Estado == uf.ID;
            });
            fs.writeFile(
                `./filesUFs/${uf.Sigla}.json`,
                JSON.stringify(newCities)
            );
        });
    } catch (error) {
        return console.log("Error:" + error);
    }
}

async function countCityInUF(uf) {
    try {
        const cityBinario = await fs.readFile(`./filesUFs/${uf}.json`, "utf-8");
        const city = JSON.parse(cityBinario);
        return city.length;
    } catch (error) {
        return console.log("Error:" + error);
    }
}

async function getBiggestNameCity(uf) {
    try {
        const citiesBinario = await fs.readFile(
            `./filesUFs/${uf}.json`,
            "utf-8"
        );
        const cities = JSON.parse(citiesBinario);
        return cities
            .sort((a, b) => b.Nome.length - a.Nome.length)
            .slice(0, 1)[0].Nome;
    } catch (error) {
        return console.log("Error:" + error);
    }
}

async function getLessNameCity(uf) {
    try {
        const citiesBinario = await fs.readFile(
            `./filesUFs/${uf}.json`,
            "utf-8"
        );
        const cities = JSON.parse(citiesBinario);
        return cities
            .sort((a, b) => a.Nome.length - b.Nome.length)
            .slice(0, 1)[0].Nome;
    } catch (error) {
        return console.log("Error:" + error);
    }
}

async function printToFiveUF() {
    try {
        const ufsBinario = await fs.readFile("./JSONs/Estados.json", "utf-8");
        const ufs = JSON.parse(ufsBinario);

        const totalCities = [];
        for (uf of ufs) {
            totalCity = {
                sigla: uf.Sigla,
                total: await countCityInUF(uf.Sigla),
            };
            totalCities.push(totalCity);
        }
        return totalCities.sort((a, b) => b.total - a.total).slice(0, 5);
    } catch (error) {
        return console.log("Error:" + error);
    }
}

async function printToFiveUFLessCity() {
    try {
        const ufsBinario = await fs.readFile("./JSONs/Estados.json", "utf-8");
        const ufs = JSON.parse(ufsBinario);

        const totalCities = [];
        for (uf of ufs) {
            totalCity = {
                sigla: uf.Sigla,
                total: await countCityInUF(uf.Sigla),
            };
            totalCities.push(totalCity);
        }
        return totalCities
            .sort((a, b) => b.total - a.total)
            .slice(totalCities.length - 5, totalCities.length);
    } catch (error) {
        return console.log("Error:" + error);
    }
}

async function printCityBiggestNameToUf() {
    try {
        const ufsBinario = await fs.readFile("./JSONs/Estados.json", "utf-8");
        const ufs = JSON.parse(ufsBinario);

        const totalCities = [];
        for (uf of ufs) {
            totalCity = {
                sigla: uf.Sigla,
                cityNameBiggest: await getBiggestNameCity(uf.Sigla),
            };
            totalCities.push(totalCity);
        }
        return totalCities;
    } catch (error) {
        return console.log("Error:" + error);
    }
}

async function printCityLessNameToUf() {
    try {
        const ufsBinario = await fs.readFile("./JSONs/Estados.json", "utf-8");
        const ufs = JSON.parse(ufsBinario);

        const totalCities = [];
        for (uf of ufs) {
            totalCity = {
                sigla: uf.Sigla,
                cityNameLess: await getLessNameCity(uf.Sigla),
            };
            totalCities.push(totalCity);
        }
        return totalCities;
    } catch (error) {
        return console.log("Error:" + error);
    }
}

//ATIVIDADE 01
unionUfCity();

//ATIVIDADE 02
(async () => {
    const retorno = await countCityInUF("AC");
    console.log(retorno);
})();

//ATIVIDADE 03
(async () => {
    const retorno = await printToFiveUF();
    console.log(retorno);
})();

//ATIVIDADE 04
(async () => {
    const retorno = await printToFiveUFLessCity();
    console.log(retorno);
})();

//ATIVIDADE 05
(async () => {
    const retorno = await printCityBiggestNameToUf();
    console.log(retorno);
})();

//ATIVIDADE 06
(async () => {
    const retorno = await printCityLessNameToUf();
    console.log(retorno);
})();

//ATIVIDADE 07
(async () => {
    const retorno = await printCityBiggestNameToUf();
    retorno.sort(function (a, b) {
        return a.cityNameBiggest.localeCompare(b.cityNameBiggest);
    });
    console.log(
        retorno
            .sort((a, b) => b.cityNameBiggest.length - a.cityNameBiggest.length)
            .slice(0, 1)[0]
    );
})();

//ATIVIDADE 08
(async () => {
    const retorno = await printCityLessNameToUf();
    retorno.sort(function (a, b) {
        return a.cityNameLess.localeCompare(b.cityNameLess);
    });
    console.log(
        retorno
            .sort((a, b) => a.cityNameLess.length - b.cityNameLess.length)
            .slice(0, 1)[0]
    );
})();
