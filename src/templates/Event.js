// src/templates/Event.js
import React, { useState } from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import * as moment from "moment"
import _ from "lodash"

const convertLB = function(description) {
  return description
    .split(`\n\n`)
    .map(paragraph => `<p>${paragraph.replace(/\n/g, `<br>`)}</p>`)
    .join(``)
  };

const ShowtimeDropdown = ({ data, onChangeSelect }) => (
  <div className="select">
    <select onChange={onChangeSelect}>
      {data.map(s => (
        <option key={s.showDate}>
          {s.showDate}
        </option>
      ))}
    </select>
  </div>
)

const ShowtimeDisplay = ({ data }) => {
  const result = [];
  const resultList = _(data)
    .groupBy(v => moment(v.start_date).format('MMM DD'))
    .value();

  _.forEach(resultList, function(elem, key){
    result.push({
      showDate: key,
      showTimes: elem
    });
  });

  const [ddState, setDropdown] = useState( (result.length) ? result[0].showDate : null );

  const handleChange = event => { setDropdown(event.target.value); }

  const resultItems = result.map(function(item, index) {
    let showtimes = item.showTimes.map(function(showtime, stindex){
      return (
        <a
          key={stindex}
          href={showtime.legacy_purchase_link}
          className="tag"
        >
            {moment(showtime.start_date).format('h:mm A')}
        </a>
      );
    });
    if (ddState === item.showDate) {
      return (
        <li key={item.showDate}>
          {item.showDate} - <div className="tags">{showtimes}</div>
        </li>
      );
    } else {
      return null;
    }
  });

  if (data.length > 0) {
    return (
      <div className="box">
        <ShowtimeDropdown data={result} onChangeSelect={handleChange} />
        <ul>
          {resultItems}
        </ul>
      </div>
    );
  } else {
    return (
      <div className="box">Coming soon!</div>
    )
  }

}

const EventTemplate = ({ data }) => (
  <Layout>
    <div className="columns">
      <div className="column">
        <h1 className="title is-size-2">{data.tribeEvents.title}</h1>
        <h2 className="subtitle is-uppercase is-size-5">{data.tribeEvents.event_metadata}</h2>
        <div className="columns is-mobile">
          <div className="column is-narrow">
            <img
              src={data.tribeEvents.image.sizes.poster_full.url}
              alt="{data.tribeEvents.title} movie poster"
              style={{ width: 200 }}
            />
          </div>
          <div className="column">
            <div
              className="content"
              dangerouslySetInnerHTML={{ __html: data.tribeEvents.description }}
            />
            <div
              className="content"
              dangerouslySetInnerHTML={{
                __html: convertLB(data.tribeEvents.event_reviews)
              }}
            />
          </div>
        </div>
      </div>
      <div className="column is-one-fifth">
        <ShowtimeDisplay data={data.tribeEvents.event_showtimes} />
        <div
          className="content is-size-7"
          dangerouslySetInnerHTML={{
            __html: convertLB(data.tribeEvents.event_details)
          }}
        />
      </div>
    </div>



  </Layout>
)
export default EventTemplate

export const query = graphql`
  query($id: String!) {
    tribeEvents(id: { eq: $id }) {
      title
      event_metadata
      description
      event_reviews
      event_details
      event_showtimes {
        start_date
        end_date
        legacy_purchase_link
      }
      image {
        sizes {
          poster_full {
            url
          }
        }
      }
    }
  }
`
