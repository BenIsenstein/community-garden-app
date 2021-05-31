import './NotAMemberButton.css'

const NotAMemberButton = ({ inputFieldSetter, membershipSetter }) => (
    <button 
      type="Button"
      onClick={() => {
        inputFieldSetter("No current membership")
        membershipSetter("")
      }}
      className="Not-a-member-button"
    >
      I'm not a member of a garden
    </button>
)


export default NotAMemberButton