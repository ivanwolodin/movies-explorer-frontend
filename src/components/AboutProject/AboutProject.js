import "./AboutProject.css"
import "../Main/Main.css"

function AboutProject() {
    return (
        <div className="project content_info">
            <h2 className="section__title">О проекте</h2>
            <div className="project__info">
                <div>
                    <p className="project__second_title">Дипломный проект включал 5 этапов</p>
                    <p className="project__additional_info">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                </div>
                <div>
                    <p className="project__second_title">На выполнение диплома ушло 5 недель</p>
                    <p className="project__additional_info">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                </div>
            </div>
            <div className="project__timeline">
                <p className="project__timeline_short project__timeline_backend">1 неделя</p>
                <p className="project__timeline_long project__timeline_frontend">4 недели</p>
            </div>
            <div className="project__timeline">
                <p className="project__timeline_short ">Back-end</p>
                <p className="project__timeline_long ">Front-end</p>
            </div>
        </div>
    );
}

export default AboutProject;
