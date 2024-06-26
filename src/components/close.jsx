export default function Close(props) {
    return (
        <svg
            fill="currentColor"
            stroke-width="0"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            height="1.5rem"
            width="1.5rem"
            style="overflow: visible;"
            class="m-4 pointer-events-auto"
            onclick={props.handleClose}
        >
            <path
                fill-rule="evenodd"
                d="m7.116 8-4.558 4.558.884.884L8 8.884l4.558 4.558.884-.884L8.884 8l4.558-4.558-.884-.884L8 7.116 3.442 2.558l-.884.884L7.116 8z"
                clip-rule="evenodd"
            ></path>
        </svg>
    );
}
