import React from 'react'
import './widgetCard.css'
import WidgetEntry from './WidgetEntry'

export default function WidgetCard({title, similar, featured, newReleases}) {
  return (
    <div className='widgetCard-body'>
      <p className="widget-title">{title}</p>
      {
        similar
        ? similar.forEach(artist=>{
          <WidgetEntry 
            title={artist?.name}
            subtitle={artist?.followers?.total}
            image={artist?.images[2].url}
          />
        })
        : featured
        ? featured.forEach(playlist=>{
          <WidgetEntry 
            title={playlist?.name}
            subtitle={playlist?.tracks?.total}
            image={playlist?.images[2]?.url}
          />
        })
        : newReleases
          ? newReleases.forEach(album=>{
            <WidgetEntry 
            title={album?.name}
            subtitle={album?.artists[0]?.name}
            image={album?.images[2].url}
          />
          })
          :null

}
    </div>
  )
}
