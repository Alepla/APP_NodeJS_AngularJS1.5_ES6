export default `

    type Projects {
        sector: String!
    }

    type Query {
        allProjects: [Projects!]!
    }
`;
