<?php

require_once('../tcpdf/config/lang/eng.php');
require_once('../tcpdf/tcpdf.php');
require_once("../conectar.php");

// extend TCPF with custom functions
class MYPDF extends TCPDF {

	// Load table data from file
	public function LoadData($file) {
		// Read file lines
		$lines = file($file);
		$data = array();
		foreach($lines as $line) {
			$data[] = explode(';', chop($line));
		}
		return $data;
	}

	// Colored table
	public function ColoredTable($header,$data) {
		// Colors, line width and bold font
		$this->SetFillColor(71, 71, 71);
		$this->SetTextColor(255);
		$this->SetDrawColor(210, 210, 210);
		$this->SetLineWidth(0.3);
		$this->SetFont('', 'B');
		// Header
		$w = array(15, 100, 15, 15, 15);
		$num_headers = count($header);
		for($i = 0; $i < $num_headers; ++$i) {
			$this->Cell($w[$i], 7, $header[$i], 1, 0, 'C', 1);
		}
		$this->Ln();
		// Color and font restoration
		$this->SetFillColor(240, 240, 240);
		$this->SetTextColor(0);
		$this->SetFont('');
		// Data
		$fill = 0;
		foreach($data as $row) {
			$this->Cell($w[0], 6, $row['id'], 'LR', 0, 'C', $fill);
			$this->Cell($w[1], 6, $row['nome_mat'], 'LR', 0, 'L', $fill);
			$this->Cell($w[2], 6, $row['un_codi'], 'LR', 0, 'C', $fill);
			$this->Cell($w[3], 6, $row['preco_unit_part'], 'LR', 0, 'C', $fill);
			$this->Cell($w[4], 6, $row['qtde_comprar'], 'LR', 0, 'C', $fill);
			//$this->Cell($w[5], 6, $row['qtde_comprar'], 'LR', 0, 'C', $fill);
			//$this->Cell($w[6], 6, $row[''] . ' LR', 'LR', 0, 'C', $fill);
			//$this->Cell($w[7], 6, $row['rental_rate'], 'LR', 0, 'C', $fill);
			//$this->Cell($w[8], 6, $row['last_update'], 'LR', 0, 'C', $fill);
			$this->Ln();
			$fill=!$fill;
		}
		$this->Cell(array_sum($w), 0, '', 'T');
	}
}


//load data
$sql = "SELECT id, nome_mat, un_codi, preco_unit_part, qtde_comprar FROM itens_ordem";

$result = array();
if ($resultdb = $mysqli->query($sql)) {

	while($record = $resultdb->fetch_assoc()) {

		array_push($result, $record);
	}	

	$resultdb->close();
}

// create new PDF document
$pdf = new MYPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);

// set document information
$pdf->SetCreator(PDF_CREATOR);
$pdf->SetAuthor('Nicola Asuni');
$pdf->SetTitle('Municipio de Monte Carlo');
//$pdf->SetSubject('TCPDF Tutorial');
//$pdf->SetKeywords('TCPDF, PDF, example, test, guide');

// set default header data
$pdf->SetHeaderData('montecarlo.png', 17, 'ESTADO DE SANTA CATARINA', '');

// set header and footer fonts
$pdf->setHeaderFont(Array(PDF_FONT_NAME_MAIN, '', PDF_FONT_SIZE_MAIN));
$pdf->setFooterFont(Array(PDF_FONT_NAME_DATA, '', PDF_FONT_SIZE_DATA));

// set default monospaced font
$pdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);

//set margins
$pdf->SetMargins(PDF_MARGIN_LEFT, PDF_MARGIN_TOP, PDF_MARGIN_RIGHT);
$pdf->SetHeaderMargin(PDF_MARGIN_HEADER);
$pdf->SetFooterMargin(PDF_MARGIN_FOOTER);

//set auto page breaks
$pdf->SetAutoPageBreak(TRUE, PDF_MARGIN_BOTTOM);

//set image scale factor
$pdf->setImageScale(PDF_IMAGE_SCALE_RATIO);

//set some language-dependent strings
$pdf->setLanguageArray($l);

// ---------------------------------------------------------


// add a page
$pdf->AddPage();

// set color for background
$pdf->SetFillColor(255, 99, 127);

//Cell($w, $h=0, $txt='', $border=0, $ln=0, $align='', $fill=0, $link='', $stretch=0, $ignore_min_height=false, $calign='T', $valign='M')

//test Cell stretching

$n_ordem = 2;

$txt = <<<EOD
Ordem de Compra nº $n_ordem

EOD;

// set font
$pdf->SetFont('times', 'BI', 19);

// print a block of text using Write()
$pdf->Write($h=0, $txt, $link='', $fill=0, $align='C', $ln=true, $stretch=0, $firstline=false, $firstblock=false, $maxh=0);

$pdf->Ln(4);

$pdf->SetFont('times', '', 12);
$pdf->setCellMargins(0, 0, 2, 0);
$pdf->SetFont('times', '', 8);
$pdf->Cell(30, 0, 'DATA DO PEDIDO', 1, 0, 'C', 1, '', 0);
$pdf->setCellMargins(0, 0, 0, 0);
$pdf->Cell(112, 0, 'NOME/RAZÃO SOCIAL', 1, 0, 'C', 1, '', 0);
$pdf->Cell(36, 0, 'CNPJ', 1, 1, 'C', 1, '', 0);

$pdf->setCellMargins(0, 0, 2, 0);
$pdf->SetFont('times', '', 12);
$pdf->Cell(30, 4, '11/12/2014', 1, 0, 'C', 0, '', 0); //data
$pdf->setCellMargins(0, 0, 0, 0);
$pdf->Cell(112, 4, 'SUL AR ÁGUA E EQUIPAMENTOS LDTA', 1, 0, 'L', 0, '', 0); //fornecedor
$pdf->Cell(36, 4, '80.033.333./0001-94', 1, 1, 'C', 0, '', 0); //cnpj

$pdf->setCellMargins(0, 2, 2, 0);
$pdf->SetFont('times', '', 8);
$pdf->Cell(30, 0, 'PROCESSO', 1, 0, 'C', 1, '', 0);
$pdf->setCellMargins(0, 0, 0, 0);
$pdf->Cell(148, 4, 'ENDERECO', 1, 1, 'C', 1, '', 0); //endereco
//$pdf->Cell(46, 4, 'BAIRRO', 1, 1, 'C', 1, '', 0); //bairro

$pdf->setCellMargins(0, 2, 2, 2);
$pdf->SetFont('times', '', 12);
$pdf->Cell(30, 4, '55', 1, 0, 'C', 0, '', 0); //processo
$pdf->setCellMargins(0, 0, 0, 0);
$pdf->Cell(148, 4, 'Rua Bahia', 1, 1, 'L', 0, '', 0); //endereco
//$pdf->Cell(46, 4, 'Salto', 1, 1, 'C', 0, '', 0); //bairro

$pdf->setCellMargins(0, 4, 2, 0);
$pdf->SetFont('times', '', 8);
$pdf->Cell(30, 0, 'HOMOLOGACAO', 1, 0, 'C', 1, '', 0);
$pdf->setCellMargins(0, 0, 0, 0);
$pdf->Cell(52, 4, 'CIDADE', 1, 0, 'C', 1, '', 0);
$pdf->Cell(12, 4, 'UF', 1, 0, 'C', 1, '', 0);
//$pdf->Cell(22, 4, 'CEP', 1, 0, 'C', 1, '', 0);
$pdf->Cell(84, 4, 'E-MAIL', 1, 1, 'C', 1, '', 0); 

$pdf->setCellMargins(0, 4, 2, 0);
$pdf->SetFont('times', '', 12);
$pdf->Cell(30, 0, '17/12/2014', 1, 0, 'C', 0, '', 0);
$pdf->setCellMargins(0, 0, 0, 0);
$pdf->Cell(52, 4, 'Blumenau', 1, 0, 'C', 0, '', 0);
$pdf->Cell(12, 4, 'SC', 1, 0, 'C', 0, '', 0);
//$pdf->Cell(22, 4, '89.031-001', 1, 0, 'C', 0, '', 0);
$pdf->Cell(84, 4, 'zrs@zrsempreendimentos.com.br ssss', 1, 1, 'C', 0, '', 0); 

$pdf->setCellMargins(0, 6, 2, 0);
$pdf->Cell(180, 0, 'DADOS PARA EMISSÃO DA NF-E', 1, 1, 'C', 0, '', 0);
$pdf->Cell(180, 0, 'PREFEITURA', 1, 0, 'C', 0, '', 0);


$pdf->Ln(80);

//COLUMNS
$pdf->Cell(0, 0, 'TEST CELL STRETCH: no stretch', 1, 1, 'C', 0, '', 0);

//Column titles
$header = array('ID', 'Material', 'UN', 'Preço', 'Qtde');

// print colored table
$pdf->ColoredTable($header, $result);

$pdf->Ln(80);

$pdf->Cell(45, 0, 'TEST CELL STRETCH: scaling', 1, 1, 'C', 0, '', 1);
$pdf->Cell(45, 0, 'TEST CELL STRETCH: force scaling', 1, 1, 'C', 0, '', 2);
$pdf->Cell(45, 0, 'TEST CELL STRETCH: spacing', 1, 1, 'C', 0, '', 3);
$pdf->Cell(45, 0, 'TEST CELL STRETCH: force spacing', 1, 1, 'C', 0, '', 4);

$pdf->AddPage();

// example using general stretching and spacing

for ($stretching = 90; $stretching <= 110; $stretching += 10) {
	for ($spacing = -0.254; $spacing <= 0.254; $spacing += 0.254) {

		// set general stretching (scaling) value
		$pdf->setFontStretching($stretching);

		// set general spacing value
		$pdf->setFontSpacing($spacing);

		$pdf->Cell(0, 0, 'Stretching '.$stretching.'%, Spacing '.sprintf('%+.3F', $spacing).'mm, no stretch', 1, 1, 'C', 0, '', 0);
		$pdf->Cell(0, 0, 'Stretching '.$stretching.'%, Spacing '.sprintf('%+.3F', $spacing).'mm, scaling', 1, 1, 'C', 0, '', 1);
		$pdf->Cell(0, 0, 'Stretching '.$stretching.'%, Spacing '.sprintf('%+.3F', $spacing).'mm, force scaling', 1, 1, 'C', 0, '', 2);
		$pdf->Cell(0, 0, 'Stretching '.$stretching.'%, Spacing '.sprintf('%+.3F', $spacing).'mm, spacing', 1, 1, 'C', 0, '', 3);
		$pdf->Cell(0, 0, 'Stretching '.$stretching.'%, Spacing '.sprintf('%+.3F', $spacing).'mm, force spacing', 1, 1, 'C', 0, '', 4);

		$pdf->Ln(2);
	}
}

// ---------------------------------------------------------

//Close and output PDF document
$pdf->Output('example_004.pdf', 'I');

//============================================================+
// END OF FILE
//============================================================+
