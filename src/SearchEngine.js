import React, { useState, useEffect } from "react";


const SearchEngine = () => {
  const [query, setQuery] = useState("");
  const [repos, setRepos] = useState([]);
  const [sort, setSort] = useState("stars");
  const [showCard, setShowCard] = useState(false);
  const [page,setPage] = useState(1);

  const fetchData = async () => {
    if(query !== ""){
      setShowCard(false);
    const response = await fetch(
      `https://api.github.com/search/repositories?q=${query}&sort=${sort}&order=desc&per_page=10&page=${page}`
    );
    const data = await response.json();
    setRepos(data.items);
    setShowCard(true);
    }
  };

  useEffect(() => {
    if(query !== ""){
      fetchData();  
    }
  }, [sort,page]);

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
  };
  const card_image = {
    style:{
      height: "160px",
      width: "160px",
      borderRadius: "50%",
      border: "5px solid #272133",
      marginTop: "20px"
    }
  }

  const onNext = () =>{
    setPage(page+1);
  }

  const onPrev = () =>{
    setPage(page-1);
  }

  const card  = {
    style: {
    backgroundColor: "#222831",
    height: "17rem",
    borderRadius: "5px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxShadow: "rgba(0, 0, 0, 0.7)",
    color: "white",
    width:"60%",
    margin: "40px 0px 0px 20%"
    }
    
  }

  return (
    <div style={{ marginTop: showCard? "100px":"" }}>
      <div style={{margin: "40px 0px 0px 0px",justifyContent: "center", display:"flex" }} >
        <input  style={{ marginRight: "15px" }} type="text" value={query} onChange={handleQueryChange} />
        <button style={{ marginRight: "15px" }} onClick={()=> fetchData()} > Search </button>
        <select value={sort} onChange={handleSortChange}>
          <option value="">Sort By</option>
          <option value="stars">Stars</option>
          <option value="watchers">Watchers</option>
          <option value="score">Score</option>
          <option value="name">Name</option>
          <option value="created">Created At</option>
          <option value="updated">Updated At</option>
        </select>
      </div>
      {
        showCard ? 
      <>
          <div>
            {repos.map((repo) => (
              <div {...card} key={repo.id}>
                <img {...card_image} src={repo.owner.avatar_url} alt="avatar" />
                <div>{repo.name}</div>
                <div>{repo.stargazers_count} {sort}</div>
                <div>{repo.description}</div>
                <div>{repo.language}</div>
              </div>
            ))}
          </div>
          <div style={{margin: "40px 0px 0px 0px",justifyContent: "center", display:"flex" }}>
            {page>1?<a href="#" onClick={()=>onPrev()} class="previous">&laquo; Previous</a>:null}
            <a href="#" onClick={()=>onNext()} class="next">Next &raquo;</a>
          </div>  
      </> : null }
      {
        !showCard && repos.length>0 ? 
      <div className="spinner-container">
        <div className="loading-spinner">
        </div>
      </div> : null
    }
    </div>
    
  );
  
};


export default SearchEngine;
