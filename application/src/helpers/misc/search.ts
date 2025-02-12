function search (searchTerm: string, data: any, dataKey?: string) {
    // If the search term is not provided, throw an error
    if(!searchTerm) {
        throw new Error("Search term is missing");
    }

    // If the data is not provided, throw an error
    else if (!data) {
        throw new Error("Data is missing");
    }

    // Create a variable, newData (for later use)
    let newData;

    // If data key is provided
    if(dataKey) {
        // Filter the data, leaving only the data where the data key is equal to the search term
        newData = data.filter((item: any) => item[dataKey] === searchTerm);

        return newData;
    }

    newData = data.filter((item: any) => item === searchTerm);


    return newData
}

/*
    EXAMPLE USAGE
    const theData = [{ name: "Leon", age: 17 }, { name: "Kin", age: 17 }]

    const usersNamedKin = search("Kin", theData, name);

    console.log(usersNamedKin);
*/

export default search;