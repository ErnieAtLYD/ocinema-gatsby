import React from "react"
import { graphql, Link } from "gatsby"
import * as moment from "moment"

import Layout from "../components/layout"
import SEO from "../components/seo"

const ShowingStatus = function({ data }) {
  // console.log(data);
  console.log(data.start_date);
  console.log(moment().isBefore(data.start_date));
  if (moment().isBefore(data.start_date)) {
    return 'Opens ' + moment(data.start_date).format('MMM DD');
  }

  console.log(data.event_showtimes);
  return 'foo';
}

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Home" />
    <ul>
      {data.allTribeEvents.edges.map(film => (
        <li key={film.node.id}>
          <Link
            to={`/event/${film.node.slug}`}>
            {film.node.title}
          </Link> - ({film.node.venue.venue})
           - <ShowingStatus data={film.node} />
        </li>
      ))}
    </ul>
  </Layout>
)

export default IndexPage

export const query = graphql`
query {
  allTribeEvents {
    edges {
      node {
        id
        title
        slug
        venue {
          venue
        }
        image {
          sizes {
            poster_thumb {
              url
            }
          }
        }
        start_date
        event_showtimes {
          start_date
        }
      }
    }
  }
}
`
