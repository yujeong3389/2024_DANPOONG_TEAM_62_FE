import React, { useEffect, useState } from 'react';
import S from './style';
import { useLocation, useNavigate } from 'react-router-dom';

const EduDetail = () => {
    const YOUNG_FARMER_API_KEY= process.env.REACT_APP_YOUNG_FARMER_API_KEY;
    const [eduDetail, setEduDetail] = useState(null);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const seq = queryParams.get('seq');
    const navigate=useNavigate();

    const fetchEducationData = async () => {
        const url = `https://apis.data.go.kr/1390000/youngV2/eduViewV2?serviceKey=${YOUNG_FARMER_API_KEY}&seq=${seq}&typeDv=json`;
    
        try {
            const response = await fetch(url);
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const data = await response.json();
            console.log(data);
            setEduDetail(data.edu_result); 

        } catch (error) {
            console.error('요청 중 오류 발생:', error);
        }
    };
    
    useEffect(() => {
        fetchEducationData();
    }, []);

    if (!eduDetail) {
        return <S.Loading>Loading...</S.Loading>;
    }

    const goToEduList=()=>{
        navigate('/info/edu')
    }
    return (
         <S.Container>
            <S.Component>
                <S.ImgContainer>
                    <a href={eduDetail.infoUrl} target="_blank" rel="noopener noreferrer">
                        <img src={process.env.PUBLIC_URL + '/global/images/buttons/pageNav.png'} alt="버튼" />
                    </a>
                </S.ImgContainer>
            {/* 왼쪽: 제목과 내용 */}
            <S.LeftContainer>
                <S.Title>{eduDetail.title}</S.Title>
                <S.Content>
                    {eduDetail.contents.split(/(?:\n|\t)+/).map((line, index) => (
                        <div key={index} style={{color:'#222222'}}>{line.trim()}</div> 
                    ))}    
                </S.Content>
            </S.LeftContainer>
            
            {/* 오른쪽: 상세 정보 */}
            <S.RightContainer>
                <S.DetailTable>
                    <tbody>
                        <tr>
                            <S.TableHeader>신청기간</S.TableHeader>
                            <S.TableData>{eduDetail.applStDt} ~ {eduDetail.applEdDt}</S.TableData>
                        </tr>
                        <tr>
                            <S.TableHeader>교육기간</S.TableHeader>
                            <S.TableData>{eduDetail.eduStDt} ~ {eduDetail.eduEdDt}</S.TableData>
                        </tr>
                        <tr>
                            <S.TableHeader>교육방법</S.TableHeader>
                            <S.TableData>{eduDetail.eduMethod} {eduDetail.eduMethod2} {eduDetail.eduMethod3}</S.TableData>
                        </tr>
                        <tr>
                            <S.TableHeader>교육대상</S.TableHeader>
                            <S.TableData>{eduDetail.eduTarget}</S.TableData>
                        </tr>
                        <tr>
                            <S.TableHeader>교육시간(h)</S.TableHeader>
                            <S.TableData>{eduDetail.eduTime}</S.TableData>
                        </tr>
                        <tr>
                            <S.TableHeader>교육인원(명)</S.TableHeader>
                            <S.TableData>{eduDetail.eduCnt}</S.TableData>
                        </tr>
                        <tr>
                            <S.TableHeader>주관기관</S.TableHeader>
                            <S.TableData>{eduDetail.chargeAgency}</S.TableData>
                        </tr>
                        <tr>
                            <S.TableHeader>담당부서</S.TableHeader>
                            <S.TableData>{eduDetail.chargeDept} ({eduDetail.chargeTel})</S.TableData>
                        </tr>
                    </tbody>
                </S.DetailTable>
            </S.RightContainer>
            </S.Component>
            <S.Button onClick={goToEduList}>
                <div style={{color:'white'}}>목록</div>
            </S.Button>
        </S.Container>
    );
};

export default EduDetail;