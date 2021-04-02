/**
4 4
1 2
4 1
2 3
3 1
2 4
**/
//2

const fs = require("fs")

function fileParser(fileName){
  let file = fs.readFileSync(fileName)
  let textByLine = file.toString("utf-8").split("\n")
  
  if(textByLine[textByLine.length-1] == ""){
    
    textByLine.pop()
    

  }
  return textByLine

}

//part1 shortest path

function shortestPath(nodes){
  
  node_list =[]  
 for (const node of nodes) {
    let head = node.split(" ")
    node_list.push([head[0],head[1]])
  }



 node_list.shift()
  let path=node_list[node_list.length-1]
  node_list.pop()
  
 const dist = recursePath(node_list, path)
  console.log(dist)
  
}

function recursePath(nodes,path,dist=[],p=[]){
 
 
 if(p.length == 0){
    p.push(path[0])
    recursePath(nodes,path,dist,p)
  }else{
    childnodes = findNodes(nodes,p[p.length-1])
    for (childNode of childnodes){
      if(childNode == path[1]){
        dist.push(p.length)
      }else{
        if (!(p.includes(childNode))){
          
          p.push(childNode)
          const reserver = [...p]
          recursePath(nodes,path,dist,p)
          p = reserver
        }
      }
    }

  }
  return dist

}


//find all possible out nodes for u
function findNodes(Q,u){
  const v = []
  
  for (let pair of Q){

    if (pair[0] == u){
      v.push(pair[1])
    }
    //since undirected 
    if(pair[1] == u){
     v.push(pair[0])
    }
    
  }
  
  return v

}




//---part 2 

function bipartite(nodes){
  
 node_list =[]  
 for (const node of nodes) {
    let head = node.split(" ")
    node_list.push([head[0],head[1]])
  }

 node_list.shift()
  
 const isBipartite = recurseNodes(node_list)
 console.log(isBipartite)
}

function recurseNodes(nodes,p=[],isBipartite=true,curr_pair){
  //console.log(p)
 //
  if (p.length == 0){
    p.push(nodes[0][0])
    isBipartite = recurseNodes(nodes,p,isBipartite,curr_pair)
  }
  else{
    let nodes_found = findNodes(nodes,p[p.length-1])
    for (let node of nodes_found){
      if (node == curr_pair){
        //pass
      }else if(p.includes(node)){
        console.log(nodes_found)
        console.log("path:" + p)
        isBipartite = false
      }else{
        curr_pair = p[p.length-1]
        const reserver = [...p]
        console.log(curr_pair)
        p.push(node)
        isBipartite =recurseNodes(nodes,p,isBipartite,curr_pair)
        p =reserver
      }
    }   
  }
  return isBipartite

}

//console.log(findNodes([["0","1"],["2","1"]],"1"))
//shortestPath(fileParser("case2.txt"))
bipartite(fileParser("case2p2.txt"))
