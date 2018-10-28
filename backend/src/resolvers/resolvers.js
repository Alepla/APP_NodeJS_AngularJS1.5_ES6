export default {
    Query: {
        allSectors: async (parent, args, { Projects }) => {
            const projects = await Projects.aggregate().project({sector:1}).group({ _id: {"sector": "$sector"}, "count":{$sum:1}}).sort({count:-1,_id:1})
            return projects.map(x => {
                x.sector = x._id.sector.toString();
                return x;
            })
        },
        allProjects: async (parent, args, { Projects }) => {
            return Projects.find({});
        }
    },
}
