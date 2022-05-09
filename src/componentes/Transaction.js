import styled from "styled-components";

function Transaction (props) {
    const { date, value, description } = props.transaction;
    console.log(value, description)
    return (
        <Section>
            <Div>
                <When>{date}</When>
                <Description>{description}</Description>
            </Div>
            <Value>{value}</Value>
        </Section>
    )
}

export default Transaction;

const Section = styled.section`
    display: flex;
    flex-wrap: wrap;
`;

const Div = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const When = styled.p`
`;

const Description = styled.p`
`;

const Value = styled.p`
`;