import React, {useEffect, useState} from "react";
import {RouteChildrenProps} from "react-router";
import {message} from "antd";
import {catTaskLog} from "@/services/open-job/api";

const RollingLog: React.FC<RouteChildrenProps> = ({ location }) => {
  const { query }: any = location;
  const [logContent, setLogContent] = useState<string>('');
  const [logId] = useState<number>(query ? query.logId : 0);
  const [fromLineNum, setFromLineNum] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(()=>{
    const loadRollingLog = async () =>{
      setLoading(true);
      try {
        const res = await catTaskLog(logId, fromLineNum);
        if (res.fromLineNum !== res.toLineNum){
          setLogContent((prev => {
            return prev + res.logContent
          }));
        }
        setFromLineNum(res.toLineNum);
      } catch (error) {
        message.error('加载任务日志失败' + error);
      } finally {
        setLoading(false);
      }
    }

    loadRollingLog().then();
  },[logId, fromLineNum])

  return (
    <div>
      <section className="content">
        <pre style={{fontSize:'14px'}}>
          <div>{logContent}</div>
          <div>{loading}</div>
        </pre>
      </section>
    </div>
  );
}

export default RollingLog;
