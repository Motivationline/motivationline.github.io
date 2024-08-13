teamHover();

function teamHover() {
    const teamImages = document.querySelectorAll("#team-members img.member");
    const teamInfos = document.querySelectorAll("#team-member-info .member");
    let activeMember;
    Array.from(document.querySelectorAll(".member-hover-container")).forEach(element => {
        // element.addEventListener("mouseover", () => {
        //     for (let img of teamImages) {
        //         img.classList.remove("highlight");
        //         if (img.dataset.member === element.dataset.member)
        //             img.classList.add("highlight");
        //     }
        // });
        // element.addEventListener("mouseout", () => {
        //     for (let img of teamImages) {
        //         if (img.dataset.member === element.dataset.member)
        //             img.classList.remove("highlight");
        //         if (img.dataset.member === activeMember)
        //             img.classList.add("highlight");
        //     }
        // });
        element.addEventListener("click", () => {
            for (let info of teamInfos) {
                if (info.dataset.member === element.dataset.member) {
                    if (info.classList.contains("show")) {
                        info.classList.remove("show");
                        activeMember = undefined;
                        for (let img of teamImages) {
                            img.classList.remove("highlight");
                        }
                    } else {
                        info.classList.add("show");
                        info.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
                        // info.scrollIntoView();
                        activeMember = info.dataset.member;
                        for (let img of teamImages) {
                            img.classList.remove("highlight");
                            if (img.dataset.member === element.dataset.member)
                                img.classList.add("highlight");
                        }
                    }
                } else {
                    info.classList.remove("show");
                }
            }
        })
    });
}