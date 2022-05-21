import styled from "styled-components";

function Transaction (props) {
    const { date, value, description } = props.transaction;
    console.log(typeof value);
    return (
        <Section>
            <Div>
                <When>{date}</When>
                <Description>{description}</Description>
            </Div>
            <Value props={value < 0}>{parseFloat(value).toFixed(2)}</Value>
        </Section>
    )
}

export default Transaction;

const Section = styled.section`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: 10px;
`;

const Div = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const When = styled.p`
    font-family: 'Raleway';
    font-size: 16px;
    line-height: 19px;
    color: #C6C6C6;
    padding-right: 7px;
`;

const Description = styled.p`
    font-family: 'Raleway';
    font-size: 16px;
    line-height: 19px;
    color: #000000;
`;

const Value = styled.p`
    font-size: 16px;
    line-height: 19px;
    font-family: 'Raleway';
    color: ${({props}) => props ? "#C70000" : "#03AC00"};
`;