import React, { useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import TableUserData from "../Components/TableUserData";
import Graph from './../Components/Graph';
import UserInfo from "../Components/UserInfo";
import { CircularProgress } from "@mui/material";


const UserPage = ()=>{

    const [data,setData]=useState([]);
    const [dataLoading, setDataLoading] = useState(true);
    const [graphData,setGraphData]=useState([]);
    const [user, loading] = useAuthState(auth);
    const { uid } = auth.currentUser;
    const navigate=useNavigate();
    let tempData=[];
    let tempGraphData=[];

    const fetchUserData=()=>{
        const resultsRef=db.collection('Results');
        
        resultsRef.where('userId','==',uid).orderBy('timeStamp', 'desc').get().then((snapshots)=>{
            snapshots.docs.map((doc)=>{
                tempData.push({ ...doc.data() })
                tempGraphData.push([doc.data().timeStamp.toDate().toLocaleString().split(',')[0], doc.data().wpm]);
            });
            setData(tempData);
            setGraphData(tempGraphData.reverse());
            setDataLoading(false);
        })
    }

    useEffect(() => {
        if (!loading) {
          fetchUserData();
        }
        if (!loading && !user) {
          navigate('/')
        }
      }, [loading]);

      if (loading || dataLoading) {

        return <div className="centerOfScreen">
          <CircularProgress size={200} />
        </div>
      }


    return(
      <div className="canvas" style={{ maxWidth: '100%' }}>
        <UserInfo totalTestsTakes={data.length}/>
        <div className="graphUserPage">
              <Graph graphData={graphData} />
        </div>
        <TableUserData data={data}/>
      </div>
    );
}

export default UserPage;