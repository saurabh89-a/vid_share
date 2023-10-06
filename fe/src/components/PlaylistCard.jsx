import "./playlistCard.css"

export const PlaylistCard=()=>{
    return <>
    <div className="styleCard">
      <div className="styleImage">
      <img
          style={{ width: 300+ "px", marginTop: "-8%" }}
          src="https://wallpapers.com/images/hd/cat-with-shades-cool-picture-lkenou4wsqrbib37.jpg"
          alt="Seattle"
      />
      </div>
      <div className="styleCardContent">
          <p className="styleCardTitle">title</p>
          <p className="styleDescription">description</p>
      </div>
    </div>
    </>
  }