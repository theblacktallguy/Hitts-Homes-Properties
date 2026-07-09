import properties from "@/data/properties/properties.json";

export type LocationGroup = {
    state: string;
    propertyCount: number;
    cities: {
        city: string;
        propertyCount: number;
    }[];
};


export function getLocationGroups(): LocationGroup[] {

    const grouped: Record<
        string,
        Record<string, number>
    > = {};


    properties.forEach((property) => {

        if (!property.state || !property.city) return;


        if (!grouped[property.state]) {
            grouped[property.state] = {};
        }


        if (!grouped[property.state][property.city]) {
            grouped[property.state][property.city] = 0;
        }


        grouped[property.state][property.city]++;

    });



    return Object.entries(grouped)
        .map(([state, cities]) => {

            const cityList = Object.entries(cities)
                .map(([city, propertyCount]) => ({
                    city,
                    propertyCount,
                }))
                .sort((a,b)=>
                    a.city.localeCompare(b.city)
                );


            return {
                state,
                propertyCount: cityList.reduce(
                    (total, city)=>
                        total + city.propertyCount,
                    0
                ),
                cities: cityList,
            };

        })
        .sort((a,b)=>
            a.state.localeCompare(b.state)
        );
}