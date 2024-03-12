import styled from "styled-components";

const Header = () => {
  const StyledHeader = styled.header`
    background-color: var(--color-grey-0);
    padding: 1.2rem 4.8rem;
    border-bottom: 1px solid var(--color-grey-100);
  `;
  return (
    <StyledHeader>
      <h1>Header</h1>
    </StyledHeader>
  );
};

export default Header;
