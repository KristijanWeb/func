<?php 
require 'db.php';

$fromperiod = $_POST['fromperiod'];
$toperiod = $_POST['toperiod'];
$odrasli = $_POST['odrasli'];
$djeca_osam = $_POST['djeca_osam'];
$djeca_dva = $_POST['djeca_dva'];
$kucni_ljubimac = $_POST['kucni_ljubimac'];
$oprema = $_POST['oprema'];
$smjestaj = $_POST['smjestaj'];
$name_lastname = $_POST['name_lastname'];
$napomena = $_POST['napomena'];
$cijena = $_POST['cijena'];

$sql = "INSERT INTO save_data( fromperiod, toperiod, odrasli, djeca_osam, djeca_dva, kucni_ljubimac, oprema, smjestaj, name_lastname, napomena, cijena) 
VALUES (:fromperiod, :toperiod, :odrasli, :djeca_osam, :djeca_dva, :kucni_ljubimac, :oprema, :smjestaj, :name_lastname, :napomena, :cijena)";
$stmt = $conn->prepare($sql);
$stmt->execute(array('fromperiod' => $fromperiod, 'toperiod' => $toperiod, 'odrasli' => $odrasli, 'djeca_osam' => $djeca_osam, 'djeca_dva' => $djeca_dva, 'kucni_ljubimac' => $kucni_ljubimac, 'oprema' => $oprema, 'smjestaj' => $smjestaj, 'name_lastname' => $name_lastname, 'napomena' => $napomena, 'cijena' => $cijena));

if($statement->rowCount() == 1) {
	echo 'Uspjeh';
}
?>