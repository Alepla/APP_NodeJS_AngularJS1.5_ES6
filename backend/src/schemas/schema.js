export default `
    scalar Date 
    type Sectors {
        sector: String!
    }
    type listProjects {
        slug: String!,
        name: String!,
        goal: Int!,
        sector: String!,
        desc: String!,
        type: String,
        investedMoney: Int,
        createdAt: Date,
        media: [String]!,
    }

    type Query {
        allSectors: [Sectors!]!,
        allProjects: [listProjects!]!
    }
    
`;
/*
slug: {type: String, lowercase: true, unique: true},
    name: String,
    company: String,
    goal: Number,
    sector: String,
    rewards: Array,
    aids:Array,
    desc: String,
    media: Array,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    investedMoney: Number,
    type:String,
    subscribers:Array,
    inversors: Array*/