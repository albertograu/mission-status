const axios = require('axios');

const {
	GraphQLObjectType,
	GraphQLInt,
	GraphQLString,
	GraphQLBoolean,
	GraphQLList,
	GraphQLSchema
} = require('graphql');

// Launch Type
const LaunchType = new GraphQLObjectType({
	name: 'Launch',
	fields: () => ({
		flight_number: { type: GraphQLInt },
		mission_name: { type: GraphQLString },
		launch_year: { type: GraphQLString },
		launch_date_local: { type: GraphQLString },
		launch_success: { type: GraphQLBoolean },
		details: { type: GraphQLString },
		launch_site: { type: LaunchSite },
		rocket: { type: RocketType },
		launch_failure_details: { type: LaunchFailure }
	})
});
// Launch Site
const LaunchSite = new GraphQLObjectType({
	name: 'LaunchSite',
	fields: () => ({
		site_id: { type: GraphQLString },
		site_name: { type: GraphQLString },
		site_name_long: { type: GraphQLString }
	})
});

// Rocket Type
const RocketType = new GraphQLObjectType({
	name: 'Rocket',
	fields: () => ({
		rocket_id: { type: GraphQLString },
		rocket_name: { type: GraphQLString },
		rocket_type: { type: GraphQLString }
	})
});

// Launch Failure Details
const LaunchFailure = new GraphQLObjectType({
	name: 'LaunchFailure',
	fields: () => ({
		time: { type: GraphQLInt },
		altitude: { type: GraphQLInt },
		reason: { type: GraphQLString }
	})
});

// Root Query
const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		launches: {
			type: new GraphQLList(LaunchType),
			resolve(parent, args) {
				return axios
					.get('https://api.spacexdata.com/v3/launches')
					.then(res => res.data);
			}
		},
		launch: {
			type: LaunchType,
			args: {
				flight_number: { type: GraphQLInt }
			},
			resolve(parent, args) {
				return axios
				.get(`https://api.spacexdata.com/v3/launches/${args.flight_number}`)
				.then(res => res.data);
			}
		}
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery
});
