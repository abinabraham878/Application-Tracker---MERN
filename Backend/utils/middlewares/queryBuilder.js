const queryBuilder = (filterQuery) => {
    if (!Array.isArray(filterQuery) || filterQuery.length === 0) {
        return {};
    }

    const query = {};

    filterQuery.forEach((filter) => {
        const { columnName, value, operation } = filter;
        switch (operation.toLowerCase()) {
            case "equals":
                if (value.length === 1) {
                    query[columnName] = value[0];
                } else {
                    query[columnName] = { $in: value };
                }
                break;
            case "notequals":
                if (value.length === 1) {
                    query[columnName] = { $ne: value[0] };
                } else {
                    query[columnName] = { $nin: value };
                }
                break;
            case "contains":
                if (value.length === 1) {
                    query[columnName] = { $regex: value[0], $options: "i" };
                } else {
                    const regexConditions = value.map((v) => ({
                        [columnName]: { $regex: v, $options: "i" },
                    }));
                    query.$or = query.$or
                        ? [...query.$or, ...regexConditions]
                        : regexConditions;
                }
                break;
            case "startswith":
                if (value.length === 1) {
                    query[columnName] = { $regex: `^${value[0]}`, $options: "i" };
                } else {
                    const regexConditions = value.map((v) => ({
                        [columnName]: { $regex: `^${v}`, $options: "i" },
                    }));
                    query.$or = query.$or
                        ? [...query.$or, ...regexConditions]
                        : regexConditions;
                }
                break;
            case "endswith":
                if (value.length === 1) {
                    query[columnName] = { $regex: `${value[0]}$`, $options: "i" };
                } else {
                    const regexConditions = value.map((v) => ({
                        [columnName]: { $regex: `${v}$`, $options: "i" },
                    }));
                    query.$or = query.$or
                        ? [...query.$or, ...regexConditions]
                        : regexConditions;
                }
                break;
            case "greaterthan":
                query[columnName] = { $gt: value[0] };
                break;
            case "lessthan":
                query[columnName] = { $lt: value[0] };
                break;
            case "between":
                if (value.length >= 2) {
                    query[columnName] = { $gte: value[0], $lte: value[1] };
                }
                break;
            default:
                // If operation is not recognized, default to equality
                query[columnName] = { $in: value };
        }
    });

    return query;
};

module.exports = queryBuilder;