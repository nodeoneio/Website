//import '../../app/globals.css';

const NewsHeadlineCard = () => {
    return (
        <div className="news-container">
            <div className="title">Breaking News</div>

            <ul>
                <li>
                    [Financial Times, 2023.10.31] 블록원, ENF (EOS Network Foundation) 와
                    극적인 협상 타결. 연내 구체적인 협상안과 투자 계획 발표
                    예고.
                </li>

                <li>
                    [Digital Asset, 2023.10.31] EOS, 블록원 투자 소식에 따른 기대감으로
                    1,000% 급등. 커뮤니티 내 희비 엇갈려.
                </li>

                <li>
                    [Bloomburg, 2023.10.29] 가상 자산 시장에 다시 훈풍 부나. RWA 및 STO
                    시장에 대한 수요 급증, 금융업계의 관심이 집중됨에 따라 각종
                    메이저 코인의 가격 상승세 두드러져.
                </li>
            </ul>
        </div>
    );
};

export default NewsHeadlineCard;
