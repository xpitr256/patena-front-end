<template>
    <footer>
        <div class="container__footer">
            <div class="box__footer">
                <div class="logo">
                    <img src="../assets/logo_uba.png" alt="">
                </div>
                <div class="terms">
                    <p>La Universidad de Buenos Aires es una universidad pública de investigación en Buenos Aires, Argentina. Establecida en 1821, es la principal institución de educación superior del país y en 2020 fue considerada la universidad más prestigiosa de Iberoamérica. </p>
                </div>
            </div>

            <div class="box__footer">
                <h3>Redes Sociales</h3>
                <a href="#"> <i class="fab fa-facebook-square"></i> Facebook</a>
                <a href="#"><i class="fab fa-twitter-square"></i> Twitter</a>
                <a href="#"><i class="fab fa-linkedin"></i> Linkedin</a>
                <a href="#"><i class="fab fa-instagram-square"></i> Instagram</a>
            </div>

            <div class="box__footer">
                <h3>Enlaces útiles</h3>
                <a href="#">Acerca de</a>
                <a href="#">Trabajos</a>
                <a href="#">Procesos</a>
                <a href="#">Servicios</a>
            </div>

            <div class="box__footer">
                <h3>Contactanos</h3>
                <a href="https://www.google.com">App Desarrollo</a>
                <a href="#">App Marketing</a>
                <a href="#">IOS Desarrollo</a>
                <a href="#">Android Desarrollo</a>
            </div>

        </div>

        <div class="box__copyright">
            <hr>
            <p>Todos los derechos reservados © 2021 <b>UBA Universidad de Buenos Aires.</b></p>
        </div>
    </footer>
</template>

<script>
</script>
<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200;0,300;0,400;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,600;1,700;1,800;1,900&display=swap');

    footer{
        width: 100%;
        padding: 80px 0px;
        background-image: url(../assets/background-footer2.svg);
        background-size: cover;

        /*background-color: #d0f0f8;
        -webkit-mask-image: url("../Images/background-footer.svg");
        mask-image: url("../Images/background-footer.svg");
        -webkit-mask-size: cover;
        mask-size: cover;*/
    }

    .container__footer{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        max-width: 1200px;
        margin: auto;
        margin-top: 100px;
        font-family: "BebasBook", "Roboto", Helvetica, sans-serif !important;
    }

    .box__footer{
        display: flex;
        flex-direction: column;
        padding: 30px;

    }

    .box__footer .logo img{
        padding: 0px 20px;
        width: 350px;
    }

    .box__footer .terms{
        max-width: 350px;
        margin-top: 20px;
        font-weight: 500;
        color: #7a7a7a;
        font-size: 18px;
    }

    .box__footer h2{
        margin-bottom: 30px;
        color: #343434;
        font-weight: 700;
    }

    .box__footer a{
        margin-top: 10px;
        color: #7a7a7a;
        font-weight: 600;
    }

    .box__footer a:hover{
        opacity: 0.8;
    }

    .box__footer a .fab{
        font-size: 18px;
    }

    .box__copyright{
        max-width: 1200px;
        margin: auto;
        text-align: center;
        padding: 0px 10px;
    }

    .box__copyright p{
        margin-top: 20px;
        color: #7a7a7a;
    }

    .box__copyright hr{
        border: none;
        height: 1px;
        background-color: #7a7a7a;
    }

</style>
